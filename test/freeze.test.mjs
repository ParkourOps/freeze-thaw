import {freeze} from "../lib/index.js";
import { should } from "chai";
should();
import { generateObject } from "./generateObject.mjs";
import { faker } from "@faker-js/faker";

describe("freeze", ()=>{
    it("should affect the original object i.e. NOT make a copy", function(){
        // start with random object
        const obj = generateObject();    

        // freeze it
        const frozenObj = freeze(obj);

        // check reference equivalence
        frozenObj.should.equal(obj);
    })
    it("should not allow changes to object when applied", function(){
        // start with random object
        const obj = generateObject();    

        // check writing to property of original DOES NOT throw
        (()=>{
            obj.filepath = faker.system.filePath();
        }).should.not.throw();

        // freeze it
        const frozenObj = freeze(obj);

        // check writing to property of original DOES throw
        (()=>{
            obj.filepath = faker.system.filePath();
        }).should.throw();        
    })
})