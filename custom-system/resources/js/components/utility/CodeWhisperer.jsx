import { useState } from 'react';


export default function CodeWhisperer(props) {
    return (
    <div className="code-whisperer">
      <h1>Code Whisperer</h1>
    </div>
  );

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
    console.log('clicked');
  }

}