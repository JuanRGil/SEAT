import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/user-api';

function UserDetail() {
  const params = useParams();
  const [userDetails, setUserDetails] = useState();
  const { userId } = params;
  useEffect(() => {
    getUser(userId).then((response) => setUserDetails(response.data));
  }, [userId]);

  return (
    <div>
      {userDetails
        ? (
          <>
            <h3>
              {`UserDetails for user with id ${userId}`}
            </h3>
            <h3>
              Full Name:
            </h3>
            <div>{`${userDetails.name} ${userDetails.surname}`}</div>
            <h3>
              Age:
            </h3>
            <div>
              {userDetails.age}
            </div>
          </>

        )
        : <div>loading</div>}
    </div>
  );
}

export default UserDetail;
