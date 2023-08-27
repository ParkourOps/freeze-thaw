import {makeFrozenCopy} from "../lib/index.js";
import { should } from "chai";
should();
import { generateObject } from "./generateObject.mjs";
import { faker } from "@faker-js/faker";

describe("makeFrozenCopy", ()=>{
    it("should make a matching copy", function(){
        // start with random object
        const obj = generateObject();

        // make frozen copy
        const frozenObj = makeFrozenCopy(obj);

        // check reference non-equivalence
        frozenObj.should.not.equal(obj);

        // check value equivalence
        JSON.stringify(frozenObj).should.equal(JSON.stringify(obj));
    })
    it("should make a read-only copy", function(){
        // start with random object
        const obj = generateObject();

        // check writing to property of original DOES NOT throw
        (()=>{
            obj.filepath = faker.system.filePath();
        }).should.not.throw();
        
        // make frozen copy
        const frozenObj = makeFrozenCopy(obj);

        // check writing to property of original (still) DOES NOT throw
        (()=>{
            obj.filepath = faker.system.filePath();
        }).should.not.throw();

        // check writing to property of copied DOES throw
        (()=>{
            frozenObj.filepath = faker.system.filePath();
        }).should.throw();            
    })
})