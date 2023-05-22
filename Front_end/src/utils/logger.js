function logger({ groupName, values = [], type = 'log' }) {
    console.group(groupName);
    values.forEach((item, index) => {
        console[type]({ index, item });
    });
    console.groupEnd();
}

export default logger;
