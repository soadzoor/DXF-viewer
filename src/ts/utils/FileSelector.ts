export class FileSelector
{
	private _uploadDiv: HTMLElement = document.getElementById("uploadDiv")!;
	private _inputElement: HTMLInputElement = document.createElement("input");

	private processFiles: (files: FileList) => Promise<void>;

	constructor(processFilesCallback: (files: FileList) => Promise<void>)
	{
		this._inputElement.type = "file";
		this._inputElement.accept = "image/x-dxf,.dxf";
		this._inputElement.multiple = false;

		this.processFiles = processFilesCallback;

		this.addEventListeners();
	}

	public addEventListeners()
	{
		this._inputElement.addEventListener("change", async (event: Event) =>
		{
			const files = this._inputElement.files!;
			await this.processFiles(files);
			this._inputElement.value = "";
		});

		this._uploadDiv.addEventListener("click", () =>
		{
			console.log("Hello");
			this._inputElement.click();
		});

		document.addEventListener("dragover", (event: Event) =>
		{
			event.preventDefault();
			this._uploadDiv.classList.add("active");
		});

		document.addEventListener("dragover", (event: Event) =>
		{
			event.preventDefault();
			this._uploadDiv.classList.add("active");
		});

		document.addEventListener("dragleave", (event: Event) =>
		{
			this._uploadDiv.classList.remove("active");
		});

		document.addEventListener("drop", (event: DragEvent) =>
		{
			event.preventDefault();
			this._uploadDiv.classList.remove("active");

			const files = event.dataTransfer!.files;
			this.processFiles(files);
		});
	}
}
