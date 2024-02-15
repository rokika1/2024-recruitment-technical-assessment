
/**
 * Task 1
 */
function leafFiles(files) {
    return files
        .filter(file => !file.categories.includes('Folder'))
        .map(file => file.name);
}

/**
 * Task 2
 */
function kLargestCategories(files, k) {
    const dictionary = {};
    files.forEach(file => {
        file.categories.forEach(category => {
            if (!dictionary[category]) {
                dictionary[category] = 1;
            } else {
                dictionary[category]++;
            }
        });
    });

    return Object.entries(dictionary)
        .sort((a, b) => {
            if (a[1] !== b[1]) {
                return b[1] - a[1]; // By size
            }
            return a[0].localeCompare(b[0]) // Alphabetically
        })
        .map(entry => entry[0])
        .splice(0, k);
}

/**
 * Task 3
 */
// Calculates total size of a file
function calcTotalSize(fileId, fileMap) {
    const file = fileMap.get(fileId);

    // If total size hasn't been calculated
    if (!file.totalSize) {
        file.totalSize = file.size;
        // Add size of children recursively
        file.children.forEach(childId => {
            file.totalSize += calcTotalSize(childId, fileMap);
        });
    }

    return file.totalSize;
}

function largestFileSize(files) {
    if (files.length === 0) {
        return 0;
    }

    // Add files to map
    const fileMap = new Map();
    files.forEach(file => {
        fileMap.set(file.id, {...file, children: []});
    });

    // Add children to parent files
    files.forEach(file => {
        const parent = fileMap.get(file.parent);
        if (parent) {
            parent.children.push(file.id);
        }
    });

    // Calculate total size for each file
    fileMap.forEach((_, fileId) => {
        calcTotalSize(fileId, fileMap);
    });

    // Find largest file size
    let largestFileSize = 0;
    fileMap.forEach(file => {
        if (file.totalSize > largestFileSize) {
            largestFileSize = file.totalSize;
        }
    });
    return largestFileSize;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

console.assert(largestFileSize(testFiles) == 20992)
