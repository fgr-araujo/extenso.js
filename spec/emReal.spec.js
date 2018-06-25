const emReal = require("../src/emReal");

describe("`emReal`", () => {
  it("deve escrever valores em reais", () => {
    expect(emReal("10.529,38")).toBe("dez mil quinhentos e vinte e nove reais e trinta e oito centavos");
    expect(emReal("10")).toBe("dez reais");
    expect(emReal("10,25")).toBe("dez reais e vinte e cinco centavos");
    expect(emReal("0,25")).toBe("vinte e cinco centavos");
  });
});
