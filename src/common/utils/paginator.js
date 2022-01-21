import axios from "@/services/axios";
import { EventEmitter } from 'events'

export default class Paginatior {

    constructor(apiURL, customParams = null) {
        this.apiURL = apiURL + (customParams ? customParams : '');

        this.event = new EventEmitter();

        this.translationKeys = {
            limit: 'per_page'
        }

        this.params = {
            page: 1,
            limit: 10
        }

        this.pagination = {
            page: 1,
            pages: 0,
            total: 0,
            limit: 0,
        }

        this.items = [];
    }

    onUpdate(callback) {
        this.event.on('update', callback);
        return this;
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
                params: this.mapParams({ ...this.params, ...params })
            })
            .then(response => {

                let data = response.data;
                let items = data.items || [];

                this.setItems(items);

                this.setPagination({
                    page: data.page,
                    pages: data.page_count,
                    limit: data.per_page,
                    total: data.total_count,
                });

                this.event.emit('update', items);


                return {
                    items: items,
                    pagination: this.getPagination(),
                };
            });
    }


    setPage(page) {
        this.params.page = page;

        return this;
    }

    setLimit(limit) {
        this.params.limit = limit;

        return this;
    }

    getPagination() {
        return this.pagination;
    }

    getCurrentPage() {
        return this.pagination.page;
    }

    getItems() {
        return this.items;
    }

    setPagination(items = {}) {
        this.pagination = { ...this.pagination, ...items };

        return this;
    }

    setItems(items = []) {
        this.items = items;

        return this;
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