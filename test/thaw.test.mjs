import { makeCopy, makeFrozenCopy, thaw } from "../lib/index.js";
import { should } from "chai";
should();
import { generateObject } from "./generateObject.mjs";
import { faker } from "@faker-js/faker";

describe("thaw", ()=>{
    it("should make a matching copy", function() {
        // start with random object
        const obj = generateObject();

        // thawed
        const thawed = thaw(obj);

        // check non-equivalence
        thawed.should.not.equal(obj);        

        // check value equivalence
        JSON.stringify(thawed).should.equal(JSON.stringify(obj));
    })
    it("should make a writeable copy", function() {
        // start with random object
        const obj = generateObject();        

        // make a frozen copy
        const frozenCopy = makeFrozenCopy(obj);

        // check writing to property of original DOES NOT throw
        (()=>{
            obj.filepath = faker.system.filePath();
        }).should.not.throw();

        // check writing to property of frozen DOES throw
        (()=>{
            frozenCopy.filepath = faker.system.filePath();
        }).should.throw();

        // thaw the original and the frozen objects
        const thawedObj = thaw(obj);
        const thawedFrozenCopy = thaw(frozenCopy);

        // check writing to property of thawed regular copy DOES NOT throw
        (()=>{
            thawedObj.filepath = faker.system.filePath();
        }).should.not.throw();

        // check writing to property of thawed frozen copy DOES NOT throw
        (()=>{
            thawedFrozenCopy.filepath = faker.system.filePath();
        }).should.not.throw();
    })
    
})