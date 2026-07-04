const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        text: {
    type: String,
    default: "",
},

        readBy: [
	    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
	    },
	],
	deliveredTo: [
    	{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    	},
	],
	file: {

    type: String,

    default: "",

},

fileType: {

    type: String,

    default: "",

},

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Message",
    messageSchema
);
