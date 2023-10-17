import { useState, FormEvent, ChangeEvent } from "react";
import { FriendType } from "../../App";

import Button from "../ui/Button";

import styles from "./Bill.module.css";

interface PropsType {
  selectedFriend: FriendType | null;
  onCalculate: ({
    id,
    amount,
  }: {
    id: string | undefined;
    amount: number;
  }) => void;
}

function Bill({ selectedFriend, onCalculate }: PropsType) {
  const [totalAmount, setTotalAmount] = useState<string | number>("");
  const [yourAmount, setYourAmount] = useState<string | number>("");
  const [friendAmount, setFriendAmount] = useState<string | number>("");
  const [whoPay, setWhoPay] = useState<string>("you");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!totalAmount || !yourAmount || !friendAmount || !whoPay) return;

    let calculated = 0;
    if (whoPay === "you") {
      calculated = -1 * Number(friendAmount);
    } else {
      calculated = Number(yourAmount);
    }
    onCalculate({ amount: calculated, id: selectedFriend?.id });
    setTotalAmount("");
    setYourAmount("");
    setFriendAmount("");
  }

  function handleYourAmount(event: ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) > Number(totalAmount)) return;
    setYourAmount(Number(event.target.value));
    setFriendAmount(Number(totalAmount) - Number(event.target.value));
  }

  return (
    <div className={styles.bill}>
      <h2>Bill</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label htmlFor="bill">Total Amount</label>
          <input
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            type="number"
            id="bill"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="your">Your Amount</label>
          <input
            disabled={!Number(totalAmount)}
            value={yourAmount}
            onChange={handleYourAmount}
            type="number"
            id="your"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="friend">{selectedFriend?.name}'s Amount</label>
          <input
            disabled
            value={friendAmount}
            onChange={(e) => setFriendAmount(e.target.value)}
            type="number"
            id="friend"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="who-pay">Who Pay the bill</label>
          <select
            value={whoPay}
            onChange={(e) => setWhoPay(e.target.value)}
            id="who-pay"
          >
            <option value="you">You</option>
            <option value="friend">{selectedFriend?.name}</option>
          </select>
        </div>
        <div className={styles.action}>
          <Button>Calculate</Button>
        </div>
      </form>
    </div>
  );
}

export default Bill;
