
'use client'
import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Box, Button, Typography, CircularProgress, Pagination, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetails from "@/components/UserDetails";
import { User } from './types'



const generateAvatar = (name: string) => {
    const initials = name.split(" ").map(word => word[0]).join("");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`;
};

const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");


    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://dummyjson.com/users');
            setUsers(response.data.users);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const handleEdit = () => {
        if (selectedUser) {
            toast.success(`Editing user: ${selectedUser.firstName}`);
        }
    };

    const handleDelete = () => {
        if (selectedUser) {
            toast.error(`Deleting user: ${selectedUser.firstName}`);
        }
    };

    const handleSendMessage = () => {
        if (selectedUser && message.trim()) {
            toast.success(`Message sent to ${selectedUser.firstName}`);
            setOpenModal(false);
            setMessage("");
        } else {
            toast.error("Please write a message to send.");
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f4f6f8' }}>
            {/* Left Column: User List */}
            <Box
                sx={{
                    width: '30%',
                    padding: 2,
                    borderRight: '1px solid #ddd',
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#1976d2 #f4f6f8',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    User List
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <List
                        height={400}
                        itemCount={currentUsers.length}
                        itemSize={70}
                        width={300}
                    >
                        {({ index, style }) => (
                            <Box
                                sx={{
                                    ...style,
                                    padding: 1,
                                    marginBottom: 1,
                                    backgroundColor: '#fff',
                                    borderRadius: 1,
                                    border: '1px solid #ddd',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                        color: '#fff',
                                    },
                                }}
                                onClick={() => handleUserSelect(currentUsers[index])}
                                key={index}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={generateAvatar(currentUsers[index].firstName)}
                                        alt="user-avatar"
                                        style={{
                                            borderRadius: '50%',
                                            width: 40,
                                            height: 40,
                                            marginRight: 10,
                                        }}
                                    />
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {currentUsers[index].firstName} ({currentUsers[index].age} years old)
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </List>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </Box>
            </Box>

            {/* Center Column: User Description */}
            {/* <Box sx={{ width: '50%', padding: 3 }}>
        {selectedUser ? (
          <>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              User Description
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
              <img
                src={generateAvatar(selectedUser.firstName)}
                alt="user-avatar"
                style={{
                  borderRadius: '50%',
                  width: 80,
                  height: 80,
                  marginRight: 20,
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {selectedUser.firstName}
                </Typography>
                <Typography variant="body1">Age: {selectedUser.age}</Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="body1" sx={{ color: 'gray' }}>
            Select a user to see the description.
          </Typography>
        )}
      </Box> */}

            <Box sx={{ width: '50%', padding: 3 }}>
                {selectedUser ? (
                    <UserDetails user={selectedUser} />
                ) : (
                    <Typography variant="body1" sx={{ color: 'gray' }}>
                        Select a user to see the description.
                    </Typography>
                )}
            </Box>

            {/* Right Column: Action Buttons */}
            <Box sx={{ width: '20%', padding: 3, backgroundColor: '#f1f3f4' }}>
                {selectedUser ? (
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 2 }}>
                            Actions
                        </Typography>
                        <Button
                            onClick={handleEdit}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant="contained"
                            color="error"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={() => setOpenModal(true)}
                        >
                            Send Message
                        </Button>
                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ color: 'gray' }}>
                        Select a user to see actions.
                    </Typography>
                )}
            </Box>

            {/* Modal for Send Message */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Send Message to {selectedUser?.firstName}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSendMessage} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>


            <ToastContainer position="bottom-right" autoClose={3000} />
        </Box>
    );
};

export default Home;
