import { createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle `
  
  .App {
    background-color: white;
  }

  .Auth-form-container {
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: url('/LogEst.jpg');
    backgroung-size: cover;
    backgroung-position: center;
    background-repeat: no-repeat;
  }

  .Auth-form {
    width: 500px;
    box-shadow: rgb(0 0 0 / 50%) 10px 10px 10px;
    padding-top: 30px;
    padding-bottom: 20px;
    border-radius: 8px;
    background-color: rgb(37, 150, 190);
  }

  .Auth-form-content {
    padding-left: 12%;
    padding-right: 12%;
  }

  .Auth-form-title {
    text-align: center;
    margin-bottom: 1em;
    font-size: 24px;
    color: rgb(34, 34, 34);
    font-weight: 800;
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: rgb(34, 34, 34);
  }

  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;

  }
  input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;

  }
  const HeaderImage = styled.div
    background-image: url($myImage);


`;

export default GlobalStyle  