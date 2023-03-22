const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({                         ////This is the schema which define the structure and end at the timestamo below
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String, 
        required: true
    }
}, { timestamps: true });



const Blog = mongoose.model('Blogs', blogSchema);                   ////This is a model base on the schema created above 

module.export = Blog;                                               //Here the schema is exported to be used in other places
