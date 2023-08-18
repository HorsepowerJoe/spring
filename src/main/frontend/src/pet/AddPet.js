import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function AddPet(props) {
  const onSubmitHandler = (event) => {
    console.log(null);
  };

  let YearList = () => {
    let result = [];
    let Array_Data = [];
    for (let i = 1990; i <= new Date().getFullYear(); i++) {
      Array_Data.push(i);
    }

    Array_Data.map((data, index) => {
      result.push(
        <option key={index} value={data}>
          {data}
        </option>
      );
    });
    return result;
  };
  let MonthList = () => {
    let result = [];
    let Array_Data = [];
    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        Array_Data.push("0" + i);
      } else {
        Array_Data.push(i);
      }
    }

    Array_Data.map((data, index) => {
      result.push(
        <option key={index} value={data}>
          {data}
        </option>
      );
    });
    return result;
  };
  let DayList = () => {
    let result = [];
    let Array_Data = [];
    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        Array_Data.push("0" + i);
      } else {
        Array_Data.push(i);
      }
    }

    Array_Data.map((data, index) => {
      result.push(
        <option key={index} value={data}>
          {data}
        </option>
      );
    });
    return result;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80%",
        }}
      >
        <fieldset>
          <legend style={{ textAlign: "center" }}>애견 등록</legend>
          <form
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
            onSubmit={onSubmitHandler}
          >
            <label>Pet Name</label>
            <input name="petName" type="text" required />
            <label>Pet Gender</label>
            <select name="customerGender">
              <option disabled selected>
                성별
              </option>
              <option value="male">남아</option>
              <option value="female">여아</option>
            </select>
            <label>Pet Age</label>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            >
              <select name="PetAgeYear">
                <option selected disabled>
                  출생년도
                </option>
                {YearList()}
              </select>
              <select name="PetAgeMonth">
                <option selected disabled>
                  월
                </option>
                {MonthList()}
              </select>
              <select name="PetAgeDay">
                <option selected disabled>
                  일
                </option>
                {DayList()}
              </select>
            </div>
            <label>Pet Weight</label>
            <div>
              <input
                type="number"
                name="petWeight"
                placeholder="Kg단위로 입력해주세요."
                style={{ width: "98.5%" }}
              />
            </div>
            <br />
            <br />
            <label>Snitchy</label>
            <label>
              <input type="radio" name="petSnitchy" value="true" />
              입질있음
            </label>
            <label>
              <input type="radio" name="petSnitchy" value="false" />
              입질없음
            </label>
            <br />
            <br />
            <label>Extra</label>
            특이사항이 있다면 여기에 적어주세요
            <textarea name="extraData" cols="50" rows="10"></textarea>
            <br />
            <button>등록하기</button>
          </form>
          <br />
        </fieldset>
      </div>
    </>
  );
}

export default AddPet;
