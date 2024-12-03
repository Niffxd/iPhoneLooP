'use client';

export default function Calendar() {
  const handler = async () => {
    await fetch('/api');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px 40px',
      }}
    >
      <div>Calendar</div>
      <br />
      <iframe
        src="https://calendar.google.com/calendar/embed?height=350&wkst=1&ctz=Australia%2FPerth&showPrint=0&showNav=0&showTabs=0&showTz=0&src=ODBhZDdlNTkwOWY0YzQ4Y2I4NTlhNDFhMjQzMjI1Zjg1NjYyMDhiYzEzZmRhZTIwMzVjOTk0N2ZkM2Y1OWNmZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23616161"
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '100vw',
          maxHeight: '350px',
          border: 'solid 1px #777',
        }}
        // width='400'
        // height='350'
        frameBorder="0"
        scrolling="no"
      />
      <br />
      <button onClick={handler}>Enviar</button>
    </div>
  );
}
