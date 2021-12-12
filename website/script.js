const uploadForm = document.getElementById('upload');
uploadForm.addEventListener('submit', sendData);

const downloadForm = document.getElementById('download');
downloadForm.addEventListener('submit', retrieveData);

function sendData(event) {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  console.log(
    JSON.stringify({
      name: name,
    })
  );

  console.log('event listner fired');
  fetch('http://localhost:3001/upload', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
    }),
  })
    .then((res) => {
      console.log({ res });
      return res.json();
    })
    .then((cid) => {
      console.log(cid);
      let p = document.createElement('p');
      let text = document.createTextNode(cid);
      p.appendChild(text);
      uploadForm.appendChild(p);
    });
}

function retrieveData(event) {
  event.preventDefault();
  const cid = document.querySelector('#cid').value;

  fetch(`http://localhost:3001/download/${cid}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((response) => {
      console.log({ response });
      return response.json();
    })
    .then((data) => {
      let p = document.createElement('p');
      let text = document.createTextNode(data);
      p.appendChild(text);
      uploadForm.appendChild(p);
    });
}
