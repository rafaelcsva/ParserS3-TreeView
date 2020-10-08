
Format S3 JSON Results like Tree View
===============

### How to use:

Inside the project run
`npm install`
and then run the script
`node index.js PathToYourS3Result.json`
It will generate the tree view JSON file inside the project with the name `TREE_VIEW.json`

S3 REGISTERS
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

OUTPUT
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

That was my JSON code block.
