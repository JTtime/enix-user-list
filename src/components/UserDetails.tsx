import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { User } from './types';

const generateAvatar = (name: string) => {
    const initials = name.split(" ").map(word => word[0]).join("");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`;
};

interface UserDetailsProps {
    user: User | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    if (!user) return <Typography variant="body1">Select a user to view details.</Typography>;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 2 }}>
                User Details
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                <img
                    src={user.image ?? generateAvatar(user.firstName)}
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
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body1">Age: {user.age}</Typography>
                    <Typography variant="body2" color="textSecondary">Role: {user.role}</Typography>
                </Box>
            </Box>
            <Paper elevation={2} sx={{ padding: '1rem' }}>

                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                    <Tab label="Contact" />
                    <Tab label="Work" />
                    <Tab label="Education" />
                    <Tab label="Bank Details" />
                    <Tab label="Crypto" />
                </Tabs>


                <Box sx={{ padding: 2 }}>
                    {selectedTab === 0 && (
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Phone</Typography>
                                <Typography variant="body1">{user.phone}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email</Typography>
                                <Typography variant="body1">{user.email}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Address</Typography>
                                <Typography variant="body1">{user.address.address}</Typography>
                                <Typography variant="body2">{user.address.city}, {user.address.state} {user.address.postalCode}</Typography>
                                <Typography variant="body2">{user.address.country}</Typography>
                            </Grid>
                        </Grid>
                    )}

                    {selectedTab === 1 && (
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Company</Typography>
                                <Typography variant="body1">{user.company.name}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Title</Typography>
                                <Typography variant="body1">{user.company.title}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Department</Typography>
                                <Typography variant="body1">{user.company.department}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Company Address</Typography>
                                <Typography variant="body1">{user.company.address.address}</Typography>
                                <Typography variant="body2">{user.company.address.city}, {user.company.address.state}</Typography>
                            </Grid>
                        </Grid>
                    )}

                    {selectedTab === 2 && (
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>University</Typography>
                                <Typography variant="body1">{user.university}</Typography>
                            </Grid>
                        </Grid>
                    )}

                    {selectedTab === 3 && (
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Card Number</Typography>
                                <Typography variant="body1">{user.bank.cardNumber}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Card Expiry</Typography>
                                <Typography variant="body1">{user.bank.cardExpire}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Currency</Typography>
                                <Typography variant="body1">{user.bank.currency}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>IBAN</Typography>
                                <Typography variant="body1">{user.bank.iban}</Typography>
                            </Grid>
                        </Grid>
                    )}

                    {selectedTab === 4 && (
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Coin</Typography>
                                <Typography variant="body1">{user.crypto.coin}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Wallet</Typography>
                                <Typography variant="body1">{user.crypto.wallet}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Network</Typography>
                                <Typography variant="body1">{user.crypto.network}</Typography>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default UserDetails;
