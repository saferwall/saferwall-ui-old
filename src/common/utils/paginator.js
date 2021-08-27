import axios from "@/services/axios";

export default class Paginatior {

    constructor(apiURL) {
        this.apiURL = apiURL;

        this.translationKeys = {
            limit: 'per_page'
        }

        this.params = {
            page: 0,
            limit: 10
        }

        this.pagination = {
            page: 0,
            pages: 0,
            total: 0,
            limit: 0,
        }

        this.items = [];
    }

    async nextPage(params = {}) {
        this.params.page++;

        return await this.fetchItems({ ...params, ...this.params });
    }

    async prevPage(params = {}) {
        this.params.page--;

        return await this.fetchItems({ ...params, ...this.params });
    }

    async fetchItems(params = {}) {
        return axios
            .get(this.apiURL, {
                params: this.mapParams(params)
            })
            .then(response => {

                let data = response.data;

                this.setItems(data.items);
                this.setPagination({
                    page: data.page,
                    pages: data.page_count,
                    limit: data.per_page,
                    total: data.total_count,
                });

                return {
                    items: data.items,
                    pagination: this.getPagination(),
                };
            });
    }


    setPage(page) {
        this.params.page = page;
    }

    setLimit(limit) {
        this.params.limit = limit;
    }

    getPagination() {
        return this.pagination;
    }

    setPagination(items = {}) {
        this.pagination = { ...this.pagination, ...items };
    }

    setItems(items = []) {
        this.items = items;
    }

    isNextPossible() {
        return this.pagination.page < this.pagination.pages;
    }

    mapParams(params = {}) {
        let nparams = {};

        Object.keys(params).forEach(_key => {
            nparams[this.translationKeys[_key] || _key] = params[_key];
        });

        return nparams;
    }
}