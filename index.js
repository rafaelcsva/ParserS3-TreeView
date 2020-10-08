const fs = require('fs');

var treeObj = [];
let childrens = {};
let marked = {};

function dfs(key){
    marked[key] = true;
    let tmpObj = [];

    // console.log(key);

    for(let i = 0 ; i < childrens[key].length ; i++){
        if(marked[childrens[key][i].key] !== undefined)
            continue;

        if(childrens[key][i].extension === 'folder'){
            let node = {name: childrens[key][i].name, extension: 'folder', expanded: false, files: 0, size: 0};

            let res = dfs(childrens[key][i].key);

            node.files += res.reduce((total, obj) => total + obj.files, 0);
            node.size += res.reduce((total, obj) => total + obj.size, 0);
            node.childEntries = res;

            tmpObj.push(node);
        }else{
            let node = {name: childrens[key][i].name, extension: childrens[key][i].extension, files: 1,
                size: childrens[key][i].size, path: childrens[key][i].path};

            tmpObj.push(node);
            // console.log("awquiasdfasd");
        }
    }

    tmpObj.sort((a, b) => {
        if(a.extension === b.extension){
            return 0;
        }
        if(a.extension === 'folder'){
            return -1;
        }
        if(b.extension === 'folder'){
            return 1;
        }

        return a.extension < b.extension ? -1 : 1;
    })
    return tmpObj;
}

const fileInput = process.argv.length > 2 ? process.argv[2] : 'AMAZON_S3_RESULTS.json';
var obj = JSON.parse(fs.readFileSync(fileInput));

for(let d = 0 ; d < obj.length ; d++){
    let folders = obj[d].Key.split('/')

    if(folders.length === 1) continue;

    let mkey = '';

    for(let i = 1 ; i < folders.length ; i++){
        mkey += folders[i - 1];

        if(childrens[mkey] === undefined){
            childrens[mkey] = [];
        }

        if(i != folders.length - 1)
            childrens[mkey].push({name: folders[i], extension: 'folder', expanded: false, key: mkey + folders[i]});
        else {
            var tp = folders[i].split('.').pop();

            childrens[mkey].push({
                name: folders[i], extension: obj[d].Size === 0 ? 'folder' : tp,
                size: obj[d].Size, key: mkey + folders[i], path: obj[d].Key
            });
        }
    }
}

for(key in childrens){
    if(marked[key] !== undefined)
        continue;

    marked[key] = true;

    let node = {name: key, extension: 'folder', expanded: false, files: 0, size: 0};

    let child = dfs(key);

    node.files += child.reduce((total, obj) => total + obj.files, 0);
    node.size += child.reduce((total, obj) => total + obj.size, 0);

    node.childEntries = child;

    treeObj.push(node);
}

fs.writeFileSync('TREE_VIEW.json', JSON.stringify(treeObj));