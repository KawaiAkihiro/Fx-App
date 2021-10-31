import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import CommonLayout from 'component/layouts/CommonLayout';
import Home from 'component/pages/Home';
import SignIn from 'component/pages/SignIn';
import SignUp from 'component/pages/SignUp';

import { getCurrentUser } from 'lib/api/auth';
import { User } from 'interfaces/index';


export const AuthContext = React.createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
});


const App = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isSignedIn, setIsSignIn] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<User | undefined>()

  // 承認済みのユーザーがいるかどうか
  // いる時はそのユーザー情報を取得
  const handleGetCurrentUser = async () => {
    try{
      const res = await getCurrentUser();

      if(res?.data.isLogin === true){
        setIsSignIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log('No current user');
      }
    } catch(err) {
      console.log(err);
    }

    setLoading(false);
  }

  React.useEffect(() => {
    handleGetCurrentUser()
  },[setCurrentUser])

  // ユーザーが認証済みかどうかでルーティングを決定する
  // 未承認の場合は「/signIn」のページに移動する
  const Private = ({children} : {children: React.ReactElement}) => {
    if(!loading){
      if(isSignedIn){
        return children
      } else {
        return <Redirect to='/signin' />
      }
    } else {
      return <></>
    }
  }



  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignIn, currentUser, setCurrentUser}} >
        <CommonLayout>
          <Switch>
            <Route exact path='/siginup' component={SignUp} />
            <Route exact path='/signin' component={SignIn} />
            <Private>
              <Route exact path='/' component={Home} />
            </Private>
          </Switch>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
