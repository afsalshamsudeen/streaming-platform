import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: #202020;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  color: white;
`;

const Section = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid #373737;
  padding-bottom: 10px;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

const ToggleSwitch = styled.input`
  width: 40px;
  height: 20px;
  appearance: none;
  background: gray;
  border-radius: 10px;
  position: relative;
  outline: none;
  cursor: pointer;

  &:checked {
    background: #4d4dff;
  }

  &::before {
    content: "";
    width: 18px;
    height: 18px;
    background: white;
    position: absolute;
    border-radius: 50%;
    top: 1px;
    left: 2px;
    transition: 0.3s;
  }

  &:checked::before {
    left: 20px;
  }
`;

const Button = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
`;

const SettingsModal = ({ onClose, currentUser }) => {
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const handleSwitchAccount = () => {
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <Overlay>
      <ModalContent>
        <h2>Settings</h2>

        <Section>
          <h4>General</h4>
          <p>Username: {currentUser?.username || "test"}</p>
          <p>Email: {currentUser?.email || "test@gmail.com"}</p>
        </Section>

        <Section>
          <h4>Notifications</h4>
          <Label>
            Enable Notifications
            <ToggleSwitch
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </Label>
        </Section>

        <Section>
          <h4>Account</h4>
          <Button onClick={handleSwitchAccount}>Switch Account</Button>
        </Section>

        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </Overlay>
  );
};

export default SettingsModal;
