import fetchMock from 'fetch-mock';
import * as API from './API';
import testResponse from './testResponse.json';
import testResult from './testResult.json';

afterEach(() => fetchMock.restore());

it('fetches search results', done => {
    fetchMock.getOnce("", {
        body: testResponse
    });
    API.search("good omens")
    .then(result => {
        expect(result).toEqual(testResult);
        done();
    })
    .catch(done);
});
