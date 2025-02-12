import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #000000a7;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  color: aliceblue;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  
  &:hover {
    background: #0056b3;
  }
`;

const CloseButton = styled(Button)`
  background: #dc3545;
  
  &:hover {
    background: #a71d2a;
  }
`;
const ButnContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;

`;

const ParentalControlModal = ({ isOpen, onClose, onSave }) => {
  const [timeLimit, setTimeLimit] = useState(60);

  const handleSave = () => {
    localStorage.setItem("parentalTimeLimit", timeLimit);
    localStorage.setItem("parentalStartTime", Date.now());
    onSave(timeLimit);
    onClose();
  };

  return (
    isOpen && (
      <ModalOverlay>
        <ModalContent>
          <h2>Set Parental Control Timer</h2>
          <p>Set the allowed watch time (in minutes):</p>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            min="10"
            max="300"
            style={{ width: "100px", padding: "5px", marginBottom: "10px" }}
          />
          <ButnContainer>
            <Button onClick={handleSave}>Save</Button>
            <CloseButton onClick={onClose}>Cancel</CloseButton>
          </ButnContainer>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default ParentalControlModal;