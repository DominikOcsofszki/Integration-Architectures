// const sinon = require('sinon');
import sinon from 'sinon';
// const request = require('request');
import request from 'request';
// const chai = require('chai');
import chai from 'chai';
const should = chai.should();
var expect = chai.expect;

const hrm = require('../test_enterprise-apps/OrangeHRMTesterWithAxios.js');

const base = 'http://localhost:1337';

const responseObject = {
    statusCode: 200,
    headers: {
        'content-type': 'application/json'
    }
};

const responseBody = {
    status: 'success',
    data: [
        {
            id: 4,
            name: 'The Land Before Time',
            genre: 'Fantasy',
            rating: 7,
            explicit: false
        },
        {
            id: 5,
            name: 'Jurassic Park',
            genre: 'Science Fiction',
            rating: 9,
            explicit: true
        },
        {
            id: 6,
            name: 'Ice Age: Dawn of the Dinosaurs',
            genre: 'Action/Romance',
            rating: 5,
            explicit: false
        }
    ]
};

describe('when stubbed', () => {
    beforeEach(() => {
        this.get = sinon.stub(request, 'get');
    });

    afterEach(() => {
        request.get.restore();
    });

    describe('GET /api/v1/movies', () => {
        it('should return all movies', (done) => {

            this.get.yields(null, responseObject, JSON.stringify(responseBody));

            request.get(`${base}/api/v1/movies`, (err, res, body) => {
                // there should be a 200 status code
                res.statusCode.should.eql(200);
                // the response should be JSON
                res.headers['content-type'].should.contain('application/json');
                // parse response body
                body = JSON.parse(body);
                // the JSON response body should have a
                // key-value pair of {"status": "success"}
                body.status.should.eql('success');
                // the JSON response body should have a
                // key-value pair of {"data": [3 movie objects]}
                body.data.length.should.eql(3);
                // the first object in the data array should
                // have the right keys
                body.data[0].should.include.keys(
                    'id', 'name', 'genre', 'rating', 'explicit'
                );
                // the first object should have the right value for name
                body.data[0].name.should.eql('The Land Before Time');
                done();
            });
        });
    });
});
