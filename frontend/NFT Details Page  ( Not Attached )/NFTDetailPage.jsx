import React from "react";

const NFTDetailPage = () => {
  return (
    <>
      <div className={Style.NFTs_Detail_Page}>
        <div className={Style.NFTs_Detail_Page_leftSide}>
          <img
            src="https://lh3.googleusercontent.com/dzQsnFv2bx2KzzSqI2dELQAJepX2S42qJgWhBUj7PvV6TZrM7zqjOVVEQ7hh2X8BJvDuEwoaaTRO10xgysF53WbYQkW_jMluiibN=s1000"
            alt=""
          />
        </div>
        <div className={Style.NFTs_Detail_Page_rightSide}>
          <h5>MalikZain</h5>
          <h2>
            MalikZain <span> #555 </span>
          </h2>
          <h6>Royalties</h6>
          <div className={Style.users}>
            <div class={Style.profile}>
              <div class={Style.circle}></div>
              <div class={Style.text}>
                <p>Creator</p>
                <p>0x3070c...bd83</p>
              </div>
            </div>
            <div class={Style.profile}>
              <div class={Style.circle}></div>
              <div class={Style.text}>
                <p>Current owner</p>
                <p>0x9f374...a098</p>
              </div>
            </div>
          </div>
          <div className={Style.purchaseCard}>
            <div className={Style.priceCard}>
              <h5>Price</h5>
              <h2>21.5 ETH</h2>
              <h5>$50,700</h5>
            </div>
            <h5 className={Style.saleTag}>Last sale price 0.65 ETH</h5>
            <div className={Style.btnDiv}>
              <button className={Style.buyBtn}>Buy now for 21.5 ETH</button>
              <button className={Style.extraBtn}>+</button>
            </div>
            <h6>Sale ends in 179 days</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTDetailPage;
