import React from 'react'

export function UserList({ users }) {
    return (
        <div className="user-list">
            <h3>Users in the room</h3>
            <ul>
                {users.map((user, idx) => (
                    <li key={idx}>{user.username}</li>
                ))}
            </ul>
        </div>
    )
}
