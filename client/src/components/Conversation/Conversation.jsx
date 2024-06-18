import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStrangerDetails } from '../../redux/actions/userActions.js'
import './conversation.scss'

export default function Conversation({ conversation, currentUserId }) {
    const dispatch = useDispatch()
    const strangerId = conversation.members.find((m) => m !== currentUserId)
    const { strangerDetails } = useSelector(
        (state) => state.strangerDetails
    )

    // Fetch user details
    useEffect(() => {
        if (strangerId) {
            dispatch(fetchStrangerDetails(strangerId))
        }
    }, [dispatch, strangerId])

    return (
        <div className="conversation">
            {/*<img*/}
            {/*    className="conversationImg"*/}
            {/*    src={*/}
            {/*        user?.profilePicture*/}
            {/*            ? PF + user.profilePicture*/}
            {/*            : PF + 'person/noAvatar.png'*/}
            {/*    }*/}
            {/*    alt=""*/}
            {/*/>*/}
            <span className="conversationName">{strangerDetails?.fullName}</span>
        </div>
    )
}
