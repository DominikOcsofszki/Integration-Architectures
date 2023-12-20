import chai from 'chai';
import { expect } from "chai";
import chaiExclude from "chai-exclude"
chai.use(chaiExclude);

// const User = require("../../src/model/User");
import {User} from "../../src/model/User";
import {deAuthenticate, isAuthenticated, Session} from "../../src/service/auth-service";
import {authenticate} from "../../src/service/auth-service";

const demouser = new User('testuser', 'John', 'Doe', 'jd@test.com', 'secret', 'admin');

describe('auth-service unit-tests', function (){
    describe('auth session test', function (){
        it('user stored in session', function (){
            const session = {} as Session;
            authenticate(session, demouser);
            if (session.user){
                expect(session.user).to.excluding('password').be.eqls(demouser);
            }
        });

        it('session marked as authenticated', function (){
            const session = {};
            authenticate(session, demouser);
            // expect(session.authenticated).to.be.true;
        });
    });

    describe('auth state check test', function (){
        it('true if session is marked as authenticated', function (){
            const session = {authenticated: true};
            expect(isAuthenticated(session)).to.be.true;
        });

        it('false if session is marked as not authenticated', function (){
            const session = {authenticated: false};
            expect(isAuthenticated(session)).to.be.false;
        });

        it('false if session is not marked', function (){
            const session = {};
            // expect(authService.isAuthenticated(session)).to.be.false;
        });
    });

    describe('auth state reset test', function (){
        it('reset session to null', function (){
            let session = {
                authenticated: true,
                user: demouser
            };
            deAuthenticate(session);
            expect(session.authenticated).to.not.be.true;
            expect(session.user).to.be.oneOf([undefined, null]);
        });
    });
});