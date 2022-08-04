import React from 'react';
import { CDBFooter,  CDBBox,  } from 'cdbreact';
import { Outlet } from 'react-router-dom';

export const Footer = () => {
  return (
    
    <div>
    <Outlet></Outlet>
    <div>

    <CDBFooter className="shadow" style={{color: "white", backgroundColor:"#767B78", position:"absolute" ,bottom:0, left:0, right:0}} >
      <CDBBox display="flex" flex="column" className="mx-auto py-2" style={{ width: '90%' }}>

        <CDBBox display="flex" justifyContent="between" className="flex-wrap">

          <CDBBox>
              <span className="ml-3 h5 font-weight-bold"><h5>Logo</h5></span>
            <p className="my-3" style={{ width: '250px' }}>
             Trade isn't about goods.Trade is about information.Goods sit in the warehouse until information moves them.
            </p>
          </CDBBox>

          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              <h5>Contact Information</h5>
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <p> 
              -warehouse@gmail.com <br></br>
              -+961 81 670 544</p>
            </CDBBox>
          </CDBBox>

          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              <h5>Social Links</h5>
            </p>
            
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
            <p>
                -www.instagram/warehouse.com <br></br>
                -www.twitter/warehouse.com 
            </p>
            </CDBBox>
          </CDBBox>

          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
            <h5>Legal Information</h5>
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
            <p className="my-3" style={{ width: '250px' }}>
              The sites content is for informational ,business and work purposes.
               The user cannot use the original content without permission.
            </p>
            </CDBBox>
          </CDBBox>

        </CDBBox>
      </CDBBox>
    </CDBFooter>
    </div>
    </div>
  );
};
export default Footer;