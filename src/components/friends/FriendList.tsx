import { FriendType } from "../../App";

import Button from "../ui/Button";
import Friend from "./Friend";
import NewFriend from "./NewFriend";

import styles from "./FriendList.module.css";

interface PropsType {
  friends: FriendType[];
  selectedId: string | undefined;
  showNewFriend: boolean;
  onAddFriend: (data: FriendType) => void;
  onToggleForm: () => void;
  onSelectFriend: (id: string) => void;
}

function FriendList({
  friends,
  onAddFriend,
  showNewFriend,
  onToggleForm,
  onSelectFriend,
  selectedId,
}: PropsType) {
  return (
    <div className={styles.friendList}>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend: FriendType) => (
          <Friend
            selectedId={selectedId}
            key={friend.id}
            friend={friend}
            onSelectFriend={onSelectFriend}
          />
        ))}
      </ul>
      {showNewFriend && <NewFriend onAddFriend={onAddFriend} />}
      <div className={styles.action}>
        <Button onClick={onToggleForm}>
          {showNewFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
    </div>
  );
}

export default FriendList;
