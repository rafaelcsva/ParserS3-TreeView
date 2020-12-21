
Format S3 JSON Results to a Tree View JSON format
===============

### How to install:

run `npm install @rafaelcsva/parse_s3_to_tree_view`.


#### How to use

----

```javascript
const parser = require('@rafaelcsva/parse_s3_to_tree_view');
const fs = require('fs');

const fileInput = './AMAZON_S3_RESULTS.json';
var obj = JSON.parse(fs.readFileSync(fileInput));

console.log(parser.s3RegisterToTreeView(obj));
```

===============

AMAZON_S3_RESULTS.json
----

```json
[
    {"Key":"folder/","LastModified":"2020-10-01T18:28:30.000Z",
        "ETag":"\"etagetag\"","Size":0,"StorageClass":"STANDARD"},
    {"Key": "folder/subfolder/", "ETag":"\"etagetag\"","Size":0,"StorageClass":"STANDARD"},
    {"Key": "folder/subfolder/file.pdf", "ETag":"\"etagetag\"","Size":1000,"StorageClass":"STANDARD"},
    {"Key":"folder1/","LastModified":"2020-10-01T18:28:30.000Z",
        "ETag":"\"etagetag\"","Size":0,"StorageClass":"STANDARD"},
    {"Key": "folder1/subfolder/", "ETag":"\"etagetag\"","Size":0,"StorageClass":"STANDARD"},
    {"Key": "folder1/subfolder/file.pdf", "ETag":"\"etagetag\"","Size":1000,"StorageClass":"STANDARD"},
    {"Key": "folder1/subfolder/file1.pdf", "ETag":"\"etagetag\"","Size":1000,"StorageClass":"STANDARD"}
]
```

===============

OUTPUT.json
----

```json
[
  {
    "name": "folder",
    "extension": "folder",
    "expanded": false,
    "files": 1,
    "size": 1000,
    "childEntries": [
      {
        "name": "subfolder",
        "extension": "folder",
        "expanded": false,
        "files": 1,
        "size": 1000,
        "childEntries": [
          {
            "name": "file.pdf",
            "extension": "pdf",
            "files": 1,
            "size": 1000,
            "path": "folder/subfolder/file.pdf"
          }
        ]
      }
    ]
  },
  {
    "name": "folder1",
    "extension": "folder",
    "expanded": false,
    "files": 2,
    "size": 2000,
    "childEntries": [
      {
        "name": "subfolder",
        "extension": "folder",
        "expanded": false,
        "files": 2,
        "size": 2000,
        "childEntries": [
          {
            "name": "file.pdf",
            "extension": "pdf",
            "files": 1,
            "size": 1000,
            "path": "folder1/subfolder/file.pdf"
          },
          {
            "name": "file1.pdf",
            "extension": "pdf",
            "files": 1,
            "size": 1000,
            "path": "folder1/subfolder/file1.pdf"
          }
        ]
      }
    ]
  }
]
```
