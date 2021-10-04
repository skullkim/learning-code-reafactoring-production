const circularStructureToJson = () => {
    const visited = new WeakSet();
    return (key, value) => {
        if(typeof value === 'object' && value !== null) {
            if(visited.has(value)) return;
            visited.add(value);
        }
        return value;
    };
};

module.exports = circularStructureToJson;