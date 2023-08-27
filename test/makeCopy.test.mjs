import {makeCopy} from "../lib/index.js";
import { should } from "chai";
should();
import { generateObject } from "./generateObject.mjs";
import { faker } from "@faker-js/faker";

describe("makeCopy", ()=>{
    it("should make a matching copy", function(){
        // start with random object
        const obj = generateObject();
        
        // copy it
        const copiedObj = makeCopy(obj);

        // check reference non-equivalence
        copiedObj.should.not.equal(obj);

        // check value equivalence
        JSON.stringify(copiedObj).should.equal(JSON.stringify(obj));
    })
    it("should make a writeable copy", function(){
        // start with random object
        const obj = generateObject();
        
        // copy it
        const copiedObj = makeCopy(obj);
        
        // check writing to property of original DOES NOT throw
        (()=>{
            obj.filepath = faker.system.filePath();
        }).should.not.throw();
        
        // check writing to property of copied DOES NOT throw
        (()=>{
            copiedObj.filepath = faker.system.filePath();
        }).should.not.throw();        
    })
})