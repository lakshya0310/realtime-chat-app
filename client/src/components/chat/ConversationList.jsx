import ConversationItem from "./ConversationItem";

function ConversationList({

    conversations,

    currentUser,

    selectedConversation,

    onSelect,

}) {

    return (

        <>

            {

                conversations.map((conversation) => (

                    <ConversationItem

                        key={conversation._id}

                        conversation={conversation}

                        currentUser={currentUser}

                        selected={

                            selectedConversation?._id ===

                            conversation._id

                        }

                        onSelect={onSelect}

                    />

                ))

            }

        </>

    );

}

export default ConversationList;
