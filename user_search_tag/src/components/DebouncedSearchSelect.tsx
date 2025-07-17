import { useState } from "react";
import { User } from "../model/user";
import { getUsers } from "../client/axiosClient";
import Dropdown from "react-bootstrap/Dropdown";

interface DebouncedSearchSelectProps {
	onChange: (users: User[]) => void
}

const DebouncedSearchSelect = ({ onChange } : DebouncedSearchSelectProps) => {
	const [userName, setUserName] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

	const handleOnSearchClick = async (user: string) => {
		const fetchedUsers = await getUsers(user);
		setUsers(fetchedUsers);
		onChange(fetchedUsers);
	}

	const handleUserClick = (user: User) => {
		if(!selectedUsers.find(u => u.id === user.id))
		{
			const newSelectedUsers = [...selectedUsers, user];
			setSelectedUsers(newSelectedUsers);
		}
	}

	const handleSelectedUserRemove = (id: number) => {
		const newSelectedUsers = selectedUsers.filter(u => u.id !== id);
		setSelectedUsers(newSelectedUsers);
	}

	const usersDropdown = (
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				Users
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{users.map(u => {
					return <Dropdown.Item onClick={e => handleUserClick(u)}>{u.name}</Dropdown.Item>
				})}
			</Dropdown.Menu>
		</Dropdown>
	)

	const selectedUsersTags = (
		selectedUsers.map(u => {
			return <div style={{backgroundColor: "white", borderRadius: "2em", color: "green", margin: "2px"}}>
				<span>{u.name}</span>
				<button onClick={e => handleSelectedUserRemove(u.id)}>x</button>
				</div>
		})
	)

	return(
		<div style={{border: "2px solid white"}}>
			<div style={{border: "2px solid yellow"}}>
				<input placeholder="Type user's name" onChange={e => setUserName(e.target.value)}></input>
				<button onClick={e => {handleOnSearchClick(userName)}}>Search</button>
			</div>
			
			<div style={{border: "2px solid red"}}>
				{
					users.length !== 0 && usersDropdown
				}	
			</div>

			<div style={{border: "2px solid blue"}}>
				{
					selectedUsers.length !== 0 && selectedUsersTags
				}
			</div>
		</div>
	);
}

export default DebouncedSearchSelect;