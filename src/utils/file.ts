// deletar o arquivo de avatar se já existir um avatar para esse usuário
import fs from "fs";

export const deleteFile = async (filePath: string) => {
	// o stat verifica se o arquivo existe
	try {
		await fs.promises.stat(filePath);
	} catch {
		return;
	}
	// remove o arquivo
	await fs.promises.unlink(filePath);
};
