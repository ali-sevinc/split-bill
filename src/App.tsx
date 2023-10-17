import { useState } from "react";

import FriendList from "./components/friends/FriendList";
import Bill from "./components/bill/Bill";

const DATA = [
  { name: "Lara", image: "https://i.pravatar.cc/48", id: "f1", stats: 0 },
  { name: "Fink", image: "https://i.pravatar.cc/48", id: "f2", stats: -10 },
  { name: "Clark", image: "https://i.pravatar.cc/48", id: "f3", stats: 10 },
];

export interface FriendType {
  name: string;
  image: string;
  id: string;
  stats: number;
}

function App() {
  const [friends, setFriends] = useState<FriendType[]>(DATA);
  const [showNewFriend, setShowNewFriend] = useState<boolean>(false);
  const [showBillForm, setShowBillForm] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendType | null>(null);

  function handleAddFriend(data: FriendType) {
    setFriends((prev) => [...prev, data]);
  }
  function handleToggleShowNewFriend() {
    setShowNewFriend((prev) => !prev);
    setShowBillForm(false);
    setSelectedFriend(null);
  }

  function handleSelectFriend(id: string) {
    const selected = friends.filter((friend) => friend.id === id)[0];
    setShowNewFriend(false);
    if (selectedFriend?.id === id) {
      setShowBillForm(false);
      setSelectedFriend(null);
    } else {
      setShowBillForm(true);
      setSelectedFriend(selected);
    }
  }

  function handleCalculate({
    id,
    amount,
  }: {
    id: string | undefined;
    amount: number;
  }) {
    setFriends((prev) =>
      prev.map((friend: FriendType) =>
        friend.id === id ? { ...friend, stats: friend.stats + amount } : friend
      )
    );
  }

  return (
    <main>
      <FriendList
        selectedId={selectedFriend?.id}
        friends={friends}
        onAddFriend={handleAddFriend}
        onToggleForm={handleToggleShowNewFriend}
        showNewFriend={showNewFriend}
        onSelectFriend={handleSelectFriend}
      />
      {showBillForm && (
        <Bill selectedFriend={selectedFriend} onCalculate={handleCalculate} />
      )}
    </main>
  );
}

export default App;
