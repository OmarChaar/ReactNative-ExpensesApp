
export function sortByLatest(list) {
    console.log("LIST", list);
    const tempList = list;
    tempList.sort((a, b) => {
        return b.date - a.date;
    });

    return tempList;
}

export function sortByOldest(list) {
    return list.sort((a, b) => {
        return a.date - b.date;
    });
}