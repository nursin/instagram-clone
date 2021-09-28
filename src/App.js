import { Button, Input, Modal, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import Post from './components/Post';
import { auth, db } from './firebase';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function App() {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in ...
                console.log(authUser)
                setUser(authUser)

                if (authUser.displayName) {
                    // dont update username
                } else {
                    // if we just created someone ...
                    return authUser.updateProfile({
                        displayName: username,
                    });
                }
            } else {
                // user has logged out ...
                setUser(null);
            }

        })

        return () => {
            // perform cleanup actions
            unsubscribe();
        }

    }, [user, username]);


    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, [])

    const signUp = (event) => {
        event.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message))
        setOpen(false);
    }

    const signIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)

            .catch((error) => alert(error.message))
        setOpenSignIn(false);
    }

    return (
        <div className="app">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <center>Instagram</center>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form className="app__signup">
                            <Input
                                placeholder="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                placeholder="password"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button onClick={signUp}>Sign Up</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <center>Instagram</center>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form className="app__signup">
                            <Input
                                placeholder="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="password"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button onClick={signIn}>Sign In</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
            <div className="app__header">
                <div className="app-img">
                    Instagram
                </div>

                {user ? (
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                ) : (
                    <div>
                        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                        <Button onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>
                )}
            </div>
            <div className="app__posts">
                {
                    posts.map(({ id, post }) => (
                        <Post
                            key={id}
                            imageUrl={post.imageUrl}
                            username={post.username}
                            caption={post.caption}
                            avatarUrl={post.avatarUrl}
                        />
                    ))
                }
            </div>

            {user?.displayName ? (
                <ImageUpload username={user.displayName} />
            ) : (
                <h3>Sorry, you need to login to upload</h3>
            )}

        </div>
    );
}

export default App;
