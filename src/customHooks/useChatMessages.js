// import { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { socketService, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_USERS_IN_ROOM, SOCKET_EMIT_SEND_MSG } from '../services/socket.service'
// import { sendMessage, learnResponse } from '../store/chat.actions'

// export function useChatMessages(room) {
//     const [msgs, setMsgs] = useState([])
//     const [users, setUsers] = useState([])
//     const botTimeoutRef = useRef()
//     const dispatch = useDispatch()
//     const loggedInUser = useSelector(storeState => storeState.userModule.user)

//     useEffect(() => {
//         socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
//         socketService.on(SOCKET_EVENT_USERS_IN_ROOM, updateUsers)
//         return () => {
//             socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
//             socketService.off(SOCKET_EVENT_USERS_IN_ROOM, updateUsers)
//             botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
//         }
//     }, [])

//     useEffect(() => {
//         socketService.emit(SOCKET_EMIT_SET_TOPIC, room)
//     }, [room])

//     const addMsg = newMsg => {
//         setMsgs(prevMsgs => [...prevMsgs, newMsg])
//     }

//     const updateUsers = users => {
//         setUsers(users)
//     }

//     const sendBotResponse = async userMsg => {
//         botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
//         botTimeoutRef.current = setTimeout(async () => {
//             const botResponse = await dispatch(sendMessage(userMsg.txt))
//             addMsg({ from: 'Bot', txt: botResponse })
//         }, 1250)
//     }

//     const handleUserMessage = async (msg, isBotMode) => {
//         const from = loggedInUser?.fullname || 'Guest'
//         const newMsg = { from, txt: msg }
//         socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
//         addMsg(newMsg)
//         if (isBotMode) sendBotResponse(newMsg)
//     }

//     const handleLearnMessage = async msg => {
//         const userMessage = msg.toLowerCase()
//         if (userMessage.startsWith('learn:')) {
//             const [key, value] = userMessage.substring(6).split('::')
//             if (key && value) {
//                 await dispatch(learnResponse(key.trim(), value.trim()))
//             }
//         }
//     }

//     return { msgs, users, handleUserMessage, handleLearnMessage }
// }
