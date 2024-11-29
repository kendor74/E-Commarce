class ApiFeatures {
    constructor(mongoseQuery, queryOptions) {
        this.mongoseQuery = mongoseQuery;
        this.queryOptions = queryOptions; // Correctly set this.queryOptions
    }

    filter() {
        const queryStringObj = { ...this.queryOptions }; // Use this.queryOptions
        const excludedFields = ["page", "limit", "sort", "fields", "keyword"];
        excludedFields.forEach((field) => delete queryStringObj[field]);

        let queryStr = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.mongoseQuery = this.mongoseQuery.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryOptions.sort) { // Use this.queryOptions
            const sortBy = this.queryOptions.sort.split(",").join(" ");
            this.mongoseQuery = this.mongoseQuery.sort(sortBy);
        } else {
            this.mongoseQuery = this.mongoseQuery.sort("-createdAt");
        }

        return this;
    }

    search() {
        if (this.queryOptions.keyword) { // Use this.queryOptions
            const searchQuery = {
                $or: [
                    { title: { $regex: this.queryOptions.keyword, $options: "i" } }, // Use this.queryOptions
                    { description: { $regex: this.queryOptions.keyword, $options: "i" } },
                    { slug: { $regex: this.queryOptions.keyword, $options: "i" } }
                ]
            };  
            this.mongoseQuery = this.mongoseQuery.find(searchQuery);
        }
        return this;
    }

    limitFields() {
        if (this.queryOptions.fields) { // Use this.queryOptions
            const fields = this.queryOptions.fields.split(",").join(" ");
            this.mongoseQuery = this.mongoseQuery.select(fields);
        } else {
            this.mongoseQuery = this.mongoseQuery.select("-__v");
        }

        return this;
    }

    page(count) {
        const page = this.queryOptions.page * 1 || 1; // Use this.queryOptions
        const limit = this.queryOptions.limit * 1 || 5;
        const skip = (page - 1) * limit;
        const endPage = page * limit;
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPages = Math.ceil(count/limit);
        if(endPage < count){
            pagination.nextPage = page + 1
        }
        if(skip > 0){
            pagination.previousPage = page - 1
        }
        this.mongoseQuery = this.mongoseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;
        return this;
    }
}

module.exports = ApiFeatures;
