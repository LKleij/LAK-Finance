import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { NewsHttpInterceptor } from "./interceptor/news.interceptor";
import { NewsHttpService } from "./news.service"


describe('News service', () => {

    let service: NewsHttpService,
        httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                NewsHttpService,
                { provide: HTTP_INTERCEPTORS, useClass: NewsHttpInterceptor, multi: true }
            ],
        }).compileComponents()
    })


    beforeEach(() => {
        service = TestBed.inject(NewsHttpService);
        httpController = TestBed.inject(HttpTestingController)
    })

    it('should send GET request with api-key param added by interceptor', () => {
        let topic = 'science';

        service.retrieveTopStories(topic).subscribe();

        const req = httpController.expectOne(req => {
            return (req.url.includes(service.TOP_STORIES_URL)) && req.url.includes(topic) && req.params.has('api-key');
        })

        expect(req.request.method).toEqual('GET');
    })
})