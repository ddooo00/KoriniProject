import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { RootState } from '../redux/config/configStore';
import updateUserNickname from "../api/editprofile";

const Mypage = () => {
  const { user } = useAppSelector((state: RootState) => state.user);

  const [userName, setUserName] = useState(user?.name);
  useEffect(() => {
    setUserName(user?.name);
  }, [user?.name])
  // console.log("username : ", userName);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.name === userName) {
      alert("현재 사용 중인 닉네임과 변경하려는 닉네임이 같습니다.");
      return false;
    } else if (user?.userid && userName) {
      updateUserNickname(user?.userid, userName);
      alert("닉네임이 정상적으로 변경되었습니다!")
    }
  }

  return (
    <>
      {
        user &&
        (
          <>
            <div>Mypage</div>
            <label htmlFor="email">가입 이메일</label>
            <input
              name="email"
              value={user?.email}
              disabled
            />
            <form onSubmit={onSubmit}>
              <label htmlFor="nickname">닉네임</label>
              <input
                name="nickname"
                value={userName}
                onChange={onChange}
              />
              <button type="submit">수정</button>
            </form>
          </>
        )
      
      }
    </>
  )
}

export default Mypage;