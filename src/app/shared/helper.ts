
export function createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
        let searchTerms = JSON.parse(filter);
        // let searchTerms = filter
        let isFilterSet = false;
        for (const col in searchTerms) {
            if (searchTerms[col]?.toString() !== '') {
                isFilterSet = true;
            } else {
                delete searchTerms[col];
            }
        }

        let nameSearch = () => {
            let found = false;
            if (isFilterSet) {
                for (const col in searchTerms) {

                    let filterWord = searchTerms[col]?.toString().trim().toLowerCase()
                    let dataWord = data[col]?.toString().toLowerCase()
                    filterWord == dataWord && isFilterSet ? found = true : '';
                    // searchTerms[col].toString().trim().toLowerCase().split(' ').forEach((word:any) => {
                    // if (data[col]?.toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                    //     found = true
                    // }
                    // });
                }
                return found
            } else {
                return true;
            }
        }
        return nameSearch()
    }
    return filterFunction
}