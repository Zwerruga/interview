import { squaresInRectangle } from "../squaresInRectangle";

describe("@SQUARES_IN_RECTANGLE test squaresInRectangle", () => {
  test("should return work correct with example", () => {
    expect(squaresInRectangle(5, 3)).toEqual([3, 2, 1, 1]);
    expect(squaresInRectangle(3, 5)).toEqual([3, 2, 1, 1]);
  });

  test("should return null if input arguments not vaild", () => {
    expect(squaresInRectangle(5, 5)).toEqual(null);
    expect(squaresInRectangle(0, 0)).toEqual(null);
  });


   describe("Random tests",function(){
    // @ts-ignore
    const t=(t,a)=>Math.floor(Math.random()*(a-t+1)+t),M=(t,a,h?)=>(h=null!=h&&h,t==a&&0==h?null:t==a?[t]:[Math.min(t,a)].concat(M(Math.min(t,a),Math.max(t,a)-Math.min(t,a),!0)));

    for (let _=0;_<40;_++){
      let randexp=t(1,2);
      let lng=t(1,2*Math.pow(10,randexp));
      let wdth=t(1,2*Math.pow(10,randexp));
      it("Testing for sqInRect("+lng+", "+wdth+")", () => {
        expect(squaresInRectangle(lng, wdth)).toEqual(M(lng, wdth));
      })
    }
  })
});
