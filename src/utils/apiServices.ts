interface ApiResponse {
  success: boolean;
  data: string;
}

export const fetchProgrammingQuote = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch('https://programming-quotes-api.herokuapp.com/Quotes/random');
    const data = await response.json();
    return {
      success: true,
      data: `"${data.en}" - ${data.author}`
    };
  } catch (error) {
    console.error('Programming Quote API Error:', error);
    return {
      success: false,
      data: "Maaf, tidak dapat mengambil quote programming saat ini."
    };
  }
};

export const fetchWikipediaInfo = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
    const data = await response.json();
    return {
      success: true,
      data: data.extract || "Maaf, informasi tidak ditemukan."
    };
  } catch (error) {
    console.error('Wikipedia API Error:', error);
    return {
      success: false,
      data: "Maaf, tidak dapat mengambil informasi dari Wikipedia saat ini."
    };
  }
};

export const generateWebTemplate = (projectType: string): string => {
  if (projectType.toLowerCase().includes('landing page')) {
    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
    <nav class="bg-gray-800 p-4">
        <div class="container mx-auto">
            <h1 class="text-white text-xl">Nama Brand Anda</h1>
        </div>
    </nav>
    <main class="container mx-auto p-4">
        <section class="py-12">
            <h2 class="text-4xl font-bold text-center mb-8">Selamat Datang</h2>
            <p class="text-center text-gray-600 max-w-2xl mx-auto">
                Deskripsi singkat tentang produk atau layanan Anda.
            </p>
        </section>
    </main>
</body>
</html>`;
  }
  return "Maaf, template untuk jenis project tersebut belum tersedia.";
};