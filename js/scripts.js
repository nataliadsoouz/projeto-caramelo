
// Utilidades de máscara simples (CPF, CEP, telefone)
function maskCPF(v){ return v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})/,'$1-$2').replace(/(-\d{2})\d+?$/,'$1'); }
function maskCEP(v){ return v.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2').slice(0,9); }
function maskPhone(v){ v=v.replace(/\D/g,''); if(v.length>10){return v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/,'($1) $2-$3');} return v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/,'($1) $2-$3'); }

document.addEventListener('input', (e)=>{
  if(e.target.id==='cpf') e.target.value = maskCPF(e.target.value);
  if(e.target.id==='cep') e.target.value = maskCEP(e.target.value);
  if(e.target.id==='tel') e.target.value = maskPhone(e.target.value);
});

// ViaCEP (preenche endereço automaticamente se existir os campos)
async function buscaCEP(cep){
  const limpo = cep.replace(/\D/g,'');
  if(limpo.length!==8) return;
  try{
    const r = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
    const d = await r.json();
    if(d.erro) return;
    const ru = document.getElementById('rua');
    const ba = document.getElementById('bairro');
    const ci = document.getElementById('cidade');
    const uf = document.getElementById('uf');
    if(ru) ru.value = d.logradouro || '';
    if(ba) ba.value = d.bairro || '';
    if(ci) ci.value = d.localidade || '';
    if(uf) uf.value = d.uf || '';
  }catch(e){ console.warn('ViaCEP falhou', e); }
}
document.addEventListener('change', (e)=>{ if(e.target.id==='cep') buscaCEP(e.target.value); });

// Gráficos em Canvas (pizza, linha, barras) — simples, sem libs
function drawCharts(){
  // Pizza
  const c1 = document.getElementById('graficoPizza'); if(c1){ const ctx=c1.getContext('2d'); const data=[40,25,20,15]; const colors=['#2563eb','#16a34a','#f59e0b','#ef4444']; let start=0; data.forEach((v,i)=>{ const ang=v/100*2*Math.PI; ctx.beginPath(); ctx.moveTo(200,150); ctx.arc(200,150,120,start,start+ang); ctx.closePath(); ctx.fillStyle=colors[i]; ctx.fill(); start+=ang; }); }
  // Linha
  const c2 = document.getElementById('graficoLinha'); if(c2){ const ctx=c2.getContext('2d'); const pts=[5,9,13,20,26,31,40]; ctx.beginPath(); ctx.moveTo(30,260); ctx.strokeStyle='#2563eb'; pts.forEach((v,i)=>{ const x=30+i*50; const y=260-v*5; ctx.lineTo(x,y); }); ctx.stroke(); }
  // Barras
  const c3 = document.getElementById('graficoBarras'); if(c3){ const ctx=c3.getContext('2d'); const ds=[12,18,9,22]; ds.forEach((v,i)=>{ const x=40+i*80; const h=v*6; ctx.fillStyle='#16a34a'; ctx.fillRect(x,260-h,50,h); }); }
}
document.addEventListener('DOMContentLoaded', drawCharts);
