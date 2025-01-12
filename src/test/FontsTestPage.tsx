import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
  font-family: "Pretendard", sans-serif;

  h1 {
    font-weight: 900; /* Black */
    font-size: 32px;
    margin-bottom: 10px;
  }

  h2 {
    font-weight: 800; /* ExtraBold */
    font-size: 28px;
    margin-bottom: 10px;
  }

  h3 {
    font-weight: 700; /* Bold */
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-weight: 400; /* Regular */
    font-size: 16px;
    margin-bottom: 10px;
  }

  span {
    font-weight: 300; /* Light */
    font-size: 14px;
  }

  .extra-light {
    font-weight: 200; /* ExtraLight */
    font-size: 14px;
  }

  .thin {
    font-weight: 100; /* Thin */
    font-size: 12px;
  }
`;

export default function FontsTestPage() {
  return (
    <Wrapper>
      <h1>Pretendard Black (900)</h1>
      <h2>Pretendard ExtraBold (800)</h2>
      <h3>Pretendard Bold (700)</h3>
      <p>Pretendard Regular (400)</p>
      <span>Pretendard Light (300)</span>
      <p className="extra-light">Pretendard ExtraLight (200)</p>
      <p className="thin">Pretendard Thin (100)</p>
    </Wrapper>
  );
}
