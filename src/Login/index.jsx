import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControlLabel } from '@mui/material';


const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const paperStyle={padding :20,height:'60vh',width:350, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(username, password);
        if (success) {
            navigate('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            {/* <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form> */}

            {/** new ui */}
            <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Sign In</h2>
                    </Grid>

                    <TextField label='Username' placeholder='Enter username' 
                        name = "username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete='off'
                        autoFocus={true}
                        variant="outlined" margin='normal' fullWidth required/>

                    <TextField label='Password' placeholder='Enter password' 
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete='off'
                        // autoFocus={true}
                        type='password' variant="outlined" margin='normal' fullWidth required/>
                    
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth
                        onClick={handleSubmit}>Sign in</Button>
                    
                </Paper>
            </Grid>
            </div>
        </div>
    );
};

export default Login;
