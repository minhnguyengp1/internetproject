import './userChat.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../redux/actions/userActions.js'
import { fetchConversations } from '../../redux/actions/conversationActions.js'
import { fetchMessages, sendMessage } from '../../redux/actions/messageActions.js'
import Conversation from '../../components/Conversation/Conversation.jsx'
import Message from '../../components/Message/Message.jsx'

export default function UserChat() {
    const dispatch = useDispatch()
    const [currentConversation, setCurrentConversation] = useState(null)
    const [newMessage, setNewMessage] = useState('')

    const { userId } = useSelector((state) => state.userLogin)
    const { conversations } = useSelector((state) => state.conversationList)
    const { messages } = useSelector((state) => state.messageList)

    useEffect(() => {
        if (userId) {
            // dispatch(fetchUserDetails())
            dispatch(fetchConversations(userId))
        }
    }, [dispatch, userId])

    useEffect(() => {
        if (currentConversation) {
            dispatch(fetchMessages(currentConversation.id))
        }
    }, [dispatch, currentConversation])

    // Polling for new messages in the current conversation
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentConversation) {
                dispatch(fetchMessages(currentConversation.id))
            }
        }, 5000) // Poll every 5 seconds

        return () => clearInterval(interval)
    }, [dispatch, currentConversation])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newMessage.trim() === '') return // Do not send empty messages

        const message = {
            senderId: userId,
            text: newMessage,
            conversationId: currentConversation.id
        }

        dispatch(sendMessage(message))
        setNewMessage('') // Clear the input field
    }

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {/*<input placeholder="Search for friends" className="chatMenuInput" />*/}
                    {conversations.map((conversation) => (
                        <div onClick={() => setCurrentConversation(conversation)}>
                            <Conversation conversation={conversation} currentUserId={userId} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentConversation ? (
                        <>
                            <div className="chatBoxTop">
                                {messages.map((message) => (
                                    // <div ref={scrollRef}>
                                    <div>
                                        <Message message={message} own={message.senderId === userId} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chatSubmitButton" onClick={handleSubmit}>
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <span className="noConversationText">Open a conversation to start a chat.</span>
                    )}
                </div>
            </div>
        </div>
    )
}
