export const CreateNewBatchWrap = styled.div`
  .submit-btn {
    background-color: ${(props) => props.theme.colors.pink300};
  }

  .createBatch-containe {
    padding: 2rem;
  }

  .batch-label {
    margin-bottom: 20px;

    h4 {
      margin-bottom: 10px;
    }

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
    }

    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;

      .add-button {
        padding: 0 10px;
        border: none;
        background-color: #28a745;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .image-preview {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;

      .image-container {
        position: relative;
        img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 5px;
        }
        .remove-btn {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 12px;
          padding: 2px 5px;
        }
      }
    }
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
    position: relative;

    &:hover {
      background-color: #f9f9f9;
    }

    p {
      margin: 10px 0;
      color: #666;
    }
  }
  .image-preview {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;

    .image-container {
      position: relative;
      img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 5px;
      }
      .remove-btn {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        padding: 2px 5px;
      }
    }
  }

  .Submit-button {
    background-color: #ff1381;
  }

  .ModalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .batches_nav {
    display: flex;
    justify-content: space-between;
    margin-left: 2em;
    margin-right: 2em;
    margin-bottom: 1rem;
  }

  .batch_btn {
    width: 150px;
    height: 40px;
    background: #fff;
    border: 2px solid #939393;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    text-decoration: none;
  }

  .batch_form {
    display: flex;
    flex-direction: column;
  }

  .batch_Label {
    font-size: 1.5em;
    margin: 1em;
  }

  #input_Name {
    width: 70%;
    font-size: 20px;
    padding: 0.7em;
    border: 2px solid #939393;
    border-radius: 7px;
    margin-left: 1.9em;
  }

  #Start_Date {
    width: 30%;
    font-size: 20px;
    padding: 0.7em;
    border: 2px solid #939393;
    border-radius: 7px;
    margin-left: 2.7em;
  }

  #Start_Time {
    width: 30%;
    font-size: 20px;
    padding: 0.7em;
    border: 2px solid #939393;
    border-radius: 7px;
    margin-left: 4.6em;
  }

  #End_Time,
  #End_Date {
    width: 30%;
    font-size: 20px;
    padding: 0.7em;
    border: 2px solid #939393;
    border-radius: 7px;
    margin-left: 2em;
  }

  #Class {
    width: 70%;
    font-size: 20px;
    padding: 0.7em;
    border: 2px solid #939393;
    border-radius: 7px;
    margin-left: 1.8em;
  }
  .basic-multi-select {
    width: 88%;
    font-size: 20px;
    padding: 0.7em;
    /* border: 2px solid #939393;
    border-radius: 7px;
    margin-left: 2.8em; */
  }

  #Teacher {
    width: 70%;
    font-size: 20px;
    padding: 0.7em;
    border: 2px solid #939393;
    border-radius: 7px;
    margin-left: 4.8em;
  }

  #Student {
    width: 70%;
    font-size: 20px;
    padding: 0.7em;
    border: 2px solid #939393;
    border-radius: 7px;
    margin-left: 1.2em;
  }

  #Submit {
    width: 20%;
    color: #fff;
    margin-top: 1em;
    background: #ff1381;
    padding: 0.7em;
    font-size: 20px;
    border: none;
    border-radius: 7px;
    margin-left: 35em;
  }

  .reateBatch-container {
    width: 100%;
    height: 100vh;
  }
  .meta_image_input {
    width: 90%; /* Full width for the meta image input */
    padding: 0.5em;
    border: 2px solid #939393;
    border-radius: 7px;
  }
`;
