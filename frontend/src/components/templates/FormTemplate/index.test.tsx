import React from "react";
import FormTemplate from ".";
import { render,screen } from "@testing-library/react";


describe('testing the template file',()=>{
    test("testing the left and right sides",()=>{
        render(<FormTemplate/>);
        const leftchild= screen.getByTestId('leftpannel');
        const rightchild=screen.getByTestId('rightpannel');
    
        expect(leftchild).toBeInTheDocument
        expect(rightchild).toBeInTheDocument
    })

    test("testing the template with the props",()=>{
        const props={
            leftChildren:'image',
            rightChildren:"testing component"
        }
        render(<FormTemplate {...props}/>);

        const leftchild=screen.getByText('image');
        const rightchild=screen.getByText("testing component");
         
        expect(leftchild).toBeInTheDocument
        expect(rightchild).toBeInTheDocument
    })
     
})